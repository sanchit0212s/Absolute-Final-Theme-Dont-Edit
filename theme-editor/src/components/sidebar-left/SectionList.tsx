import { useMemo } from 'react';
import { GripVertical, Eye, EyeOff, Trash2 } from 'lucide-react';
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditorStore } from '@/stores/editorStore';
import { useChangeStore } from '@/stores/changeStore';

function SortableSection({ id, name, isSelected, onClick }: {
  id: string; name: string; isSelected: boolean; onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors group ${
        isSelected
          ? 'bg-editor-highlight border border-editor-accent/30'
          : 'hover:bg-editor-surface-2 border border-transparent'
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="text-editor-text-muted hover:text-editor-text cursor-grab active:cursor-grabbing"
      >
        <GripVertical size={14} />
      </button>
      <span className="text-sm flex-1 truncate">{name}</span>
    </div>
  );
}

export function SectionList() {
  const {
    activeTemplatePath, activeTemplateJSON, themeFiles,
    selectedSectionId, selectSection,
  } = useEditorStore();
  const { getEffectiveSectionOrder, addChange } = useChangeStore();

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const order = useMemo(() => {
    if (!activeTemplateJSON) return [];
    return getEffectiveSectionOrder(activeTemplatePath, activeTemplateJSON.order);
  }, [activeTemplateJSON, activeTemplatePath, getEffectiveSectionOrder]);

  const sectionNames = useMemo(() => {
    const map: Record<string, string> = {};
    if (!activeTemplateJSON) return map;
    for (const id of order) {
      const config = activeTemplateJSON.sections[id];
      if (!config) continue;
      const file = themeFiles.get(`sections/${config.type}.liquid`);
      map[id] = file?.schema?.name || config.type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
    return map;
  }, [order, activeTemplateJSON, themeFiles]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = order.indexOf(String(active.id));
    const newIndex = order.indexOf(String(over.id));
    const newOrder = [...order];
    newOrder.splice(oldIndex, 1);
    newOrder.splice(newIndex, 0, String(active.id));

    addChange({
      type: 'section_order',
      templatePath: activeTemplatePath,
      sectionId: '__order__',
      oldValue: order,
      newValue: newOrder,
    });
  }

  // Post message to iframe to scroll to section
  function handleClick(id: string) {
    selectSection(id);
    const iframe = document.querySelector('iframe');
    iframe?.contentWindow?.postMessage({ type: 'scroll-to-section', sectionId: id }, '*');
  }

  if (!activeTemplateJSON) {
    return <div className="p-4 text-sm text-editor-text-muted">No template loaded</div>;
  }

  return (
    <div className="flex flex-col gap-1 p-2">
      <div className="px-2 py-1.5 text-xs font-semibold text-editor-text-muted uppercase tracking-wider">
        Sections
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          {order.map(id => (
            <SortableSection
              key={id}
              id={id}
              name={sectionNames[id] || id}
              isSelected={selectedSectionId === id}
              onClick={() => handleClick(id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
