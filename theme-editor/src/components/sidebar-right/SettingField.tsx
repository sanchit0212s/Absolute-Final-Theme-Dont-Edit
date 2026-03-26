import { useRef } from 'react';
import { Upload } from 'lucide-react';
import type { SchemaSetting } from '@/types/schema';

interface Props {
  setting: SchemaSetting;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function SettingField({ setting, value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  if (setting.type === 'header') {
    return (
      <div className="pt-3 pb-1 border-t border-editor-border mt-2 first:mt-0 first:border-0 first:pt-0">
        <span className="text-xs font-semibold text-editor-text-muted uppercase tracking-wider">
          {setting.label}
        </span>
      </div>
    );
  }

  if (setting.type === 'paragraph') {
    return (
      <p className="text-xs text-editor-text-muted leading-relaxed">{setting.info || setting.label}</p>
    );
  }

  const label = (
    <label className="block text-xs font-medium text-editor-text-muted mb-1">
      {setting.label}
    </label>
  );

  switch (setting.type) {
    case 'text':
      return (
        <div>
          {label}
          <input
            type="text"
            value={String(value ?? '')}
            onChange={e => onChange(e.target.value)}
            placeholder={setting.placeholder}
            className="w-full bg-editor-surface-2 border border-editor-border rounded px-2.5 py-1.5 text-sm text-editor-text focus:outline-none focus:border-editor-accent"
          />
        </div>
      );

    case 'textarea':
    case 'richtext':
      return (
        <div>
          {label}
          <textarea
            value={String(value ?? '')}
            onChange={e => onChange(e.target.value)}
            placeholder={setting.placeholder}
            rows={3}
            className="w-full bg-editor-surface-2 border border-editor-border rounded px-2.5 py-1.5 text-sm text-editor-text focus:outline-none focus:border-editor-accent resize-y"
          />
        </div>
      );

    case 'number':
    case 'range':
      return (
        <div>
          {label}
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={setting.min ?? 0}
              max={setting.max ?? 100}
              step={setting.step ?? 1}
              value={Number(value ?? setting.default ?? setting.min ?? 0)}
              onChange={e => onChange(Number(e.target.value))}
              className="flex-1 accent-editor-accent"
            />
            <span className="text-xs text-editor-text-muted w-10 text-right">
              {String(value ?? setting.default ?? '')}{setting.unit || ''}
            </span>
          </div>
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChange(!value)}
            className={`w-8 h-5 rounded-full relative transition-colors ${
              value ? 'bg-editor-accent' : 'bg-editor-surface-3'
            }`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
              value ? 'translate-x-3.5' : 'translate-x-0.5'
            }`} />
          </button>
          <span className="text-xs text-editor-text-muted">{setting.label}</span>
        </div>
      );

    case 'color':
      return (
        <div>
          {label}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={String(value ?? '#000000')}
              onChange={e => onChange(e.target.value)}
              className="w-8 h-8 rounded border border-editor-border cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={String(value ?? '')}
              onChange={e => onChange(e.target.value)}
              className="flex-1 bg-editor-surface-2 border border-editor-border rounded px-2.5 py-1.5 text-sm text-editor-text font-mono focus:outline-none focus:border-editor-accent"
            />
          </div>
        </div>
      );

    case 'select':
      return (
        <div>
          {label}
          <select
            value={String(value ?? '')}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-editor-surface-2 border border-editor-border rounded px-2.5 py-1.5 text-sm text-editor-text focus:outline-none focus:border-editor-accent"
          >
            {setting.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );

    case 'url':
      return (
        <div>
          {label}
          <input
            type="url"
            value={String(value ?? '')}
            onChange={e => onChange(e.target.value)}
            placeholder={setting.placeholder || 'https://'}
            className="w-full bg-editor-surface-2 border border-editor-border rounded px-2.5 py-1.5 text-sm text-editor-text focus:outline-none focus:border-editor-accent"
          />
        </div>
      );

    case 'image_picker':
      return (
        <div>
          {label}
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-editor-border rounded-lg p-4 text-center cursor-pointer hover:border-editor-accent transition-colors"
          >
            {value ? (
              <img src={String(value)} alt="Preview" className="max-h-24 mx-auto rounded" />
            ) : (
              <div className="flex flex-col items-center gap-1 text-editor-text-muted">
                <Upload size={20} />
                <span className="text-xs">Click to upload</span>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                onChange(url);
              }
            }}
          />
        </div>
      );

    default:
      return (
        <div>
          {label}
          <input
            type="text"
            value={String(value ?? '')}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-editor-surface-2 border border-editor-border rounded px-2.5 py-1.5 text-sm text-editor-text focus:outline-none focus:border-editor-accent"
          />
        </div>
      );
  }
}
