/*!
 * @pixi/layers - v2.0.0
 * Compiled Fri, 04 Nov 2022 18:35:51 UTC
 *
 * @pixi/layers is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 *
 * Copyright 2017-2021, Ivan Popelyshev, All Rights Reserved
 */ 
import * as PIXI from "@tbminiapp/pixi-miniprogram-engine";

(this.PIXI = this.PIXI || {}),
  (this.PIXI.layers = (function (h, d, l) {
    "use strict";
    function y(t) {
      return function (e) {
        if (
          !(
            this._activeParentLayer &&
            this._activeParentLayer !== e._activeLayer
          )
        ) {
          if (!this.visible) {
            this.displayOrder = 0;
            return;
          }
          (this.displayOrder = e.incDisplayOrder()),
            !(this.worldAlpha <= 0 || !this.renderable) &&
              ((e._activeLayer = null),
              t.call(this, e),
              (e._activeLayer = this._activeParentLayer));
        }
      };
    }
    function R(t) {
      if (
        !(this._activeParentLayer && this._activeParentLayer !== t._activeLayer)
      ) {
        if (!this.visible) {
          this.displayOrder = 0;
          return;
        }
        (this.displayOrder = t.incDisplayOrder()),
          !(this.worldAlpha <= 0 || !this.renderable) &&
            ((t._activeLayer = null),
            this.containerRenderWebGL(t),
            (t._activeLayer = this._activeParentLayer));
      }
    }
    function T() {
      if (d.DisplayObject.prototype.displayOrder !== void 0) return;
      Object.assign(d.DisplayObject.prototype, {
        parentLayer: null,
        _activeParentLayer: null,
        parentGroup: null,
        zOrder: 0,
        zIndex: 0,
        updateOrder: 0,
        displayOrder: 0,
        layerableChildren: !0,
        isLayer: !1,
      });
      const t = d.Container.prototype;
      (t.containerRenderWebGL = t.render), (t.render = R);
    }
    function L(t) {
      t.originalRenderWebGL ||
        ((t.originalRenderWebGL = t.render),
        (t.render = y(t.render)),
        t.renderCanvas &&
          ((t.originalRenderWebGL = t.renderCanvas),
          (t.renderCanvas = y(t.renderCanvas))));
    }
    function O(t) {
      (t.prototype.layerableChildren = !1), L(t.prototype);
    }
    class S {
      constructor() {
        (this._tempPoint = new l.Point()),
          (this._queue = [[], []]),
          (this._eventDisplayOrder = 0),
          (this.worksWithLayers = !0);
      }
      recursiveFindHit(e, r, s, i, n) {
        if (!r || !r.visible) return 0;
        let a = 0,
          u = (i = r.interactive || i);
        r.hitArea && (u = !1), r._activeParentLayer && (n = !1);
        const v = r._mask;
        s < 1 / 0 && v && v.containsPoint && !v.containsPoint(e) && (n = !0),
          s < 1 / 0 &&
            r.filterArea &&
            (r.filterArea.contains(e.x, e.y) || (n = !0));
        const x = r.children;
        if (r.interactiveChildren && x)
          for (let b = x.length - 1; b >= 0; b--) {
            const P = x[b],
              C = this.recursiveFindHit(e, P, s, u, n);
            if (C) {
              if (!P.parent) continue;
              (a = C), (s = C);
            }
          }
        return (
          i &&
            (n
              ? r.interactive && this._queueAdd(r, 0)
              : (s < r.displayOrder &&
                  (r.hitArea
                    ? (r.worldTransform.applyInverse(e, this._tempPoint),
                      r.hitArea.contains(
                        this._tempPoint.x,
                        this._tempPoint.y
                      ) && (a = r.displayOrder))
                    : r.containsPoint &&
                      r.containsPoint(e) &&
                      (a = r.displayOrder)),
                r.interactive && this._queueAdd(r, a === 1 / 0 ? 0 : a))),
          a
        );
      }
      findHit(e, r, s, i) {
        const n = e.data.global;
        this._startInteractionProcess(),
          this.recursiveFindHit(n, r, i ? 0 : 1 / 0, !1, !1),
          this._finishInteractionProcess(e, s);
      }
      _startInteractionProcess() {
        (this._eventDisplayOrder = 1),
          this._queue || (this._queue = [[], []]),
          (this._queue[0].length = 0),
          (this._queue[1].length = 0);
      }
      _queueAdd(e, r) {
        const s = this._queue;
        if (r < this._eventDisplayOrder) s[0].push(e);
        else {
          if (r > this._eventDisplayOrder) {
            this._eventDisplayOrder = r;
            const i = s[1];
            for (let n = 0, a = i.length; n < a; n++) s[0].push(i[n]);
            s[1].length = 0;
          }
          s[1].push(e);
        }
      }
      _finishInteractionProcess(e, r) {
        const s = this._queue;
        let i = s[0];
        for (let n = 0, a = i.length; n < a; n++) r && r(e, i[n], !1);
        i = s[1];
        for (let n = 0, a = i.length; n < a; n++)
          e.target || (e.target = i[n]), r && r(e, i[n], !0);
      }
    }
    function I(t) {
      return function (e, r, s, i, n) {
        (!r || (!r.renderTexture && !r.baseTexture)) &&
          (this._lastDisplayOrder = 0),
          (this._activeLayer = null),
          e.isStage && e.updateStage(),
          this.plugins.interaction &&
            !this.plugins.interaction.search.worksWithLayers &&
            (this.plugins.interaction.search = new S()),
          t.call(this, e, r, s, i, n);
      };
    }
    function _(t) {
      const e = t.prototype;
      e._oldRender ||
        (Object.assign(e, {
          _lastDisplayOrder: 0,
          _activeLayer: null,
          incDisplayOrder() {
            return ++this._lastDisplayOrder;
          },
          _oldRender: l.Renderer.prototype.render,
        }),
        (e._oldRender = e.render),
        (e.render = I(e.render)));
    }
    function D(t) {
      if (!t) {
        console.log(
          "@pixi/layers: Canvas mixin was called with empty parameter. Are you sure that you even need this line?"
        );
        return;
      }
      _(t);
      const e = d.Container.prototype;
      e.containerRenderCanvas ||
        ((e.containerRenderCanvas = e.renderCanvas),
        (e.renderCanvas = y(e.renderCanvas)));
    }
    const o = class extends l.utils.EventEmitter {
      constructor(t = 0, e = !1) {
        super(),
          (this.useRenderTexture = !1),
          (this.useDoubleBuffer = !1),
          (this.sortPriority = 0),
          (this.clearColor = new Float32Array([0, 0, 0, 0])),
          (this.canDrawWithoutLayer = !1),
          (this.canDrawInParentStage = !0),
          (this._activeLayer = null),
          (this._activeStage = null),
          (this._activeChildren = []),
          (this._lastUpdateId = -1),
          (this.zIndex = t || 0),
          (this.enableSort = !!e),
          typeof e == "function" && this.on("sort", e);
      }
      doSort(t, e) {
        if (this.listeners("sort", !0))
          for (let r = 0; r < e.length; r++) this.emit("sort", e[r]);
        e.sort(o.compareZIndex);
      }
      static compareZIndex(t, e) {
        return t.zOrder < e.zOrder
          ? -1
          : t.zOrder > e.zOrder
          ? 1
          : t.updateOrder - e.updateOrder;
      }
      clear() {
        (this._activeLayer = null),
          (this._activeStage = null),
          (this._activeChildren.length = 0);
      }
      _resolveChildDisplayObject(t, e) {
        this.check(t),
          (e._activeParentLayer = this._activeLayer),
          this._activeLayer
            ? this._activeLayer._activeChildren.push(e)
            : this._activeChildren.push(e);
      }
      _resolveLayer(t, e) {
        this.check(t),
          this._activeLayer && o.conflict(),
          (this._activeLayer = e),
          (this._activeStage = t);
      }
      check(t) {
        if (this._lastUpdateId < o._layerUpdateId)
          (this._lastUpdateId = o._layerUpdateId),
            this.clear(),
            (this._activeStage = t);
        else if (this.canDrawInParentStage) {
          let e = this._activeStage;
          for (; e && e !== t; ) e = e._activeParentStage;
          (this._activeStage = e), e === null && this.clear();
        }
      }
      static conflict() {
        o._lastLayerConflict + 5e3 < Date.now() &&
          ((o._lastLayerConflict = Date.now()),
          console.log(
            "@pixi/layers found two layers with the same group in one stage - that's not healthy. Please place a breakpoint here and debug it"
          ));
      }
    };
    let c = o;
    (c._layerUpdateId = 0), (c._lastLayerConflict = 0);
    class f {
      constructor(e) {
        (this.layer = e),
          (this.renderTexture = null),
          (this.doubleBuffer = null),
          (this.currentBufferIndex = 0),
          (this._tempRenderTarget = null),
          (this._tempRenderTargetSource = new l.Rectangle()),
          (this._tempRenderTargetDestination = new l.Rectangle());
      }
      init(e) {
        const r = e ? e.screen.width : 100,
          s = e ? e.screen.height : 100,
          i = e ? e.resolution : l.settings.RESOLUTION;
        (this.renderTexture = l.RenderTexture.create({
          width: r,
          height: s,
          resolution: i,
        })),
          this.layer.group.useDoubleBuffer &&
            (this.doubleBuffer = [
              l.RenderTexture.create({ width: r, height: s, resolution: i }),
              l.RenderTexture.create({ width: r, height: s, resolution: i }),
            ]);
      }
      getRenderTexture() {
        return this.renderTexture || this.init(), this.renderTexture;
      }
      pushTexture(e) {
        const r = e.screen;
        this.renderTexture || this.init(e);
        const s = this.renderTexture,
          i = this.layer.group,
          n = this.doubleBuffer;
        if (
          ((s.width !== r.width ||
            s.height !== r.height ||
            s.baseTexture.resolution !== e.resolution) &&
            ((s.baseTexture.resolution = e.resolution),
            s.resize(r.width, r.height),
            n &&
              ((n[0].baseTexture.resolution = e.resolution),
              n[0].resize(r.width, r.height),
              (n[1].baseTexture.resolution = e.resolution),
              n[1].resize(r.width, r.height))),
          n &&
            ((n[0].framebuffer.multisample = s.framebuffer.multisample),
            (n[1].framebuffer.multisample = s.framebuffer.multisample)),
          (this._tempRenderTarget = e.renderTexture.current),
          this._tempRenderTargetSource.copyFrom(e.renderTexture.sourceFrame),
          this._tempRenderTargetDestination.copyFrom(
            e.renderTexture.destinationFrame
          ),
          e.batch.flush(),
          i.useDoubleBuffer)
        ) {
          let u = n[this.currentBufferIndex];
          u.baseTexture._glTextures[e.CONTEXT_UID] ||
            (e.renderTexture.bind(u, void 0, void 0),
            e.texture.bind(u),
            i.clearColor && e.renderTexture.clear(i.clearColor)),
            e.texture.unbind(s.baseTexture),
            (s.baseTexture._glTextures = u.baseTexture._glTextures),
            (s.baseTexture.framebuffer = u.baseTexture.framebuffer),
            (u = n[1 - this.currentBufferIndex]),
            e.renderTexture.bind(u, void 0, void 0);
        } else e.renderTexture.bind(s, void 0, void 0);
        i.clearColor && e.renderTexture.clear(i.clearColor);
        const a = e.filter.defaultFilterStack;
        a.length > 1 &&
          (a[a.length - 1].renderTexture = e.renderTexture.current);
      }
      popTexture(e) {
        e.batch.flush(), e.framebuffer.blit();
        const r = e.filter.defaultFilterStack;
        r.length > 1 &&
          (r[r.length - 1].renderTexture = this._tempRenderTarget),
          e.renderTexture.bind(
            this._tempRenderTarget,
            this._tempRenderTargetSource,
            this._tempRenderTargetDestination
          ),
          (this._tempRenderTarget = null);
        const s = this.renderTexture,
          i = this.layer.group,
          n = this.doubleBuffer;
        if (i.useDoubleBuffer) {
          e.texture.unbind(s.baseTexture),
            (this.currentBufferIndex = 1 - this.currentBufferIndex);
          const a = n[this.currentBufferIndex];
          (s.baseTexture._glTextures = a.baseTexture._glTextures),
            (s.baseTexture.framebuffer = a.baseTexture.framebuffer);
        }
      }
      destroy() {
        this.renderTexture &&
          (this.renderTexture.destroy(),
          this.doubleBuffer &&
            (this.doubleBuffer[0].destroy(!0),
            this.doubleBuffer[1].destroy(!0)));
      }
    }
    class p extends d.Container {
      constructor(e = null) {
        super(),
          (this.isLayer = !0),
          (this.group = null),
          (this._activeChildren = []),
          (this._tempChildren = null),
          (this._activeStageParent = null),
          (this._sortedChildren = []),
          (this._tempLayerParent = null),
          (this.insertChildrenBeforeActive = !0),
          (this.insertChildrenAfterActive = !0),
          e
            ? ((this.group = e), (this.zIndex = e.zIndex))
            : (this.group = new c(0, !1)),
          (this._tempChildren = this.children);
      }
      get useRenderTexture() {
        return this.group.useRenderTexture;
      }
      set useRenderTexture(e) {
        this.group.useRenderTexture = e;
      }
      get useDoubleBuffer() {
        return this.group.useDoubleBuffer;
      }
      set useDoubleBuffer(e) {
        this.group.useDoubleBuffer = e;
      }
      get clearColor() {
        return this.group.clearColor;
      }
      set clearColor(e) {
        this.group.clearColor = e;
      }
      get sortPriority() {
        return this.group.sortPriority;
      }
      set sortPriority(e) {
        this.group.sortPriority = e;
      }
      getRenderTexture() {
        return (
          this.textureCache || (this.textureCache = new f(this)),
          this.textureCache.getRenderTexture()
        );
      }
      doSort() {
        this.group.doSort(this, this._sortedChildren);
      }
      destroy(e) {
        this.textureCache &&
          (this.textureCache.destroy(), (this.textureCache = null)),
          super.destroy(e);
      }
      render(e) {
        !this.prerender(e) ||
          (this.group.useRenderTexture &&
            (this.textureCache || (this.textureCache = new f(this)),
            this.textureCache.pushTexture(e)),
          this.containerRenderWebGL(e),
          this.postrender(e),
          this.group.useRenderTexture && this.textureCache.popTexture(e));
      }
      layerRenderCanvas(e) {
        this.prerender(e) &&
          (this.containerRenderCanvas(e), this.postrender(e));
      }
      _onBeginLayerSubtreeTraversal(e) {
        const r = this._activeChildren;
        (this._activeStageParent = e), this.group._resolveLayer(e, this);
        const s = this.group._activeChildren;
        r.length = 0;
        for (let i = 0; i < s.length; i++)
          (s[i]._activeParentLayer = this), r.push(s[i]);
        s.length = 0;
      }
      _onEndLayerSubtreeTraversal() {
        const e = this.children,
          r = this._activeChildren,
          s = this._sortedChildren;
        for (let i = 0; i < r.length; i++) this.emit("display", r[i]);
        if (((s.length = 0), this.insertChildrenBeforeActive))
          for (let i = 0; i < e.length; i++) s.push(e[i]);
        for (let i = 0; i < r.length; i++) s.push(r[i]);
        if (!this.insertChildrenBeforeActive && this.insertChildrenAfterActive)
          for (let i = 0; i < e.length; i++) s.push(e[i]);
        this.group.enableSort && this.doSort();
      }
      prerender(e) {
        return this._activeParentLayer &&
          this._activeParentLayer != e._activeLayer
          ? !1
          : this.visible
          ? ((this.displayOrder = e.incDisplayOrder()),
            this.worldAlpha <= 0 || !this.renderable
              ? !1
              : (this.children !== this._sortedChildren &&
                  this._tempChildren !== this.children &&
                  (this._tempChildren = this.children),
                this._boundsID++,
                (this.children = this._sortedChildren),
                (this._tempLayerParent = e._activeLayer),
                (e._activeLayer = this),
                !0))
          : ((this.displayOrder = 0), !1);
      }
      postrender(e) {
        (this.children = this._tempChildren),
          (e._activeLayer = this._tempLayerParent),
          (this._tempLayerParent = null);
      }
    }
    p.prototype.renderCanvas = p.prototype.layerRenderCanvas;
    const g = class extends p {
      constructor() {
        super(...arguments),
          (this.isStage = !0),
          (this._tempGroups = []),
          (this._activeLayers = []),
          (this._activeParentStage = null);
      }
      clear() {
        (this._activeLayers.length = 0), (this._tempGroups.length = 0);
      }
      destroy(t) {
        this.clear(), super.destroy(t);
      }
      updateStage() {
        (this._activeParentStage = null),
          c._layerUpdateId++,
          this._updateStageInner();
      }
      updateAsChildStage(t) {
        (this._activeParentStage = t),
          (g._updateOrderCounter = 0),
          this._updateStageInner();
      }
      _updateStageInner() {
        this.clear(), this._addRecursive(this);
        const t = this._activeLayers;
        for (let e = 0; e < t.length; e++) {
          const r = t[e];
          if (r.group.sortPriority) {
            r._onEndLayerSubtreeTraversal();
            const s = r._sortedChildren;
            for (let i = 0; i < s.length; i++) this._addRecursiveChildren(s[i]);
          }
        }
        for (let e = 0; e < t.length; e++) {
          const r = t[e];
          r.group.sortPriority || r._onEndLayerSubtreeTraversal();
        }
      }
      _addRecursive(t) {
        if (!t.visible) return;
        if (t.isLayer) {
          const i = t;
          this._activeLayers.push(i), i._onBeginLayerSubtreeTraversal(this);
        }
        if (t !== this && t.isStage) {
          t.updateAsChildStage(this);
          return;
        }
        t._activeParentLayer = null;
        let e = t.parentGroup;
        e && e._resolveChildDisplayObject(this, t);
        const r = t.parentLayer;
        if (
          (r && ((e = r.group), e._resolveChildDisplayObject(this, t)),
          (t.updateOrder = ++g._updateOrderCounter),
          t.alpha <= 0 ||
            !t.renderable ||
            !t.layerableChildren ||
            (e && e.sortPriority))
        )
          return;
        const s = t.children;
        if (s && s.length)
          for (let i = 0; i < s.length; i++) this._addRecursive(s[i]);
      }
      _addRecursiveChildren(t) {
        if (t.alpha <= 0 || !t.renderable || !t.layerableChildren) return;
        const e = t.children;
        if (e && e.length)
          for (let r = 0; r < e.length; r++) this._addRecursive(e[r]);
      }
    };
    let m = g;
    return (
      (m._updateOrderCounter = 0),
      T(),
      _(l.Renderer),
      (h.Group = c),
      (h.Layer = p),
      (h.LayerTextureCache = f),
      (h.Stage = m),
      (h.applyCanvasMixin = D),
      (h.applyContainerRenderMixin = L),
      (h.applyDisplayMixin = T),
      (h.applyParticleMixin = O),
      (h.applyRendererMixin = _),
      Object.defineProperty(h, "__esModule", { value: !0 }),
      h
    );
  })({}, PIXI, PIXI));
//# sourceMappingURL=pixi-layers.js.map