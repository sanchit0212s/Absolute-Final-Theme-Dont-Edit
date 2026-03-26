import { Liquid, Tag, type TagToken, type Context, type TopLevelToken, type Emitter, type Template } from 'liquidjs';

export function registerShopifyTags(engine: Liquid): void {
  // Schema tag — strip completely (content is metadata, not rendered)
  engine.registerTag('schema', class extends Tag {
    constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid) {
      super(token, remainTokens, liquid);
      while (remainTokens.length) {
        const t = remainTokens.shift()!;
        if ((t as TagToken).name === 'endschema') break;
      }
    }
    *render(): Generator { /* no output */ }
  });

  // Form tag — render a simple <form> wrapper
  engine.registerTag('form', class extends Tag {
    private formType: string;
    private tpls: Template[] = [];

    constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid) {
      super(token, remainTokens, liquid);
      this.formType = token.args.replace(/['"]/g, '').trim();

      const stream = liquid.parser.parseStream(remainTokens);
      stream.on('tag:endform', () => stream.stop())
        .on('*', (t: Template) => this.tpls.push(t))
        .start();
    }

    *render(ctx: Context, emitter: Emitter): Generator {
      emitter.write(`<form method="post" action="/contact" data-form-type="${this.formType}">`);
      yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter);
      emitter.write('</form>');
    }
  });

  // Section tag — renders a static section inline (fallback)
  engine.registerTag('section', class extends Tag {
    private sectionName: string;

    constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid) {
      super(token, remainTokens, liquid);
      this.sectionName = token.args.replace(/['"]/g, '').trim();
    }

    *render(_ctx: Context, emitter: Emitter): Generator {
      emitter.write(`<!-- static-section: ${this.sectionName} -->`);
    }
  });

  // Style tag — output inline <style>
  engine.registerTag('style', class extends Tag {
    private tpls: Template[] = [];

    constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid) {
      super(token, remainTokens, liquid);
      const stream = liquid.parser.parseStream(remainTokens);
      stream.on('tag:endstyle', () => stream.stop())
        .on('*', (t: Template) => this.tpls.push(t))
        .start();
    }

    *render(ctx: Context, emitter: Emitter): Generator {
      emitter.write('<style>');
      yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter);
      emitter.write('</style>');
    }
  });

  // Javascript tag
  engine.registerTag('javascript', class extends Tag {
    private tpls: Template[] = [];

    constructor(token: TagToken, remainTokens: TopLevelToken[], liquid: Liquid) {
      super(token, remainTokens, liquid);
      const stream = liquid.parser.parseStream(remainTokens);
      stream.on('tag:endjavascript', () => stream.stop())
        .on('*', (t: Template) => this.tpls.push(t))
        .start();
    }

    *render(ctx: Context, emitter: Emitter): Generator {
      emitter.write('<script>');
      yield this.liquid.renderer.renderTemplates(this.tpls, ctx, emitter);
      emitter.write('</script>');
    }
  });
}
