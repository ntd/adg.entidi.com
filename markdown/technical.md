---
title: 'Technical details'
description: 'What kind of software technologies have been leveraged and the rationale behind these decisions'
---
The project grew up around cairo and the GObject library. But although the ADG
canvas is developed in plain C using the object-oriented approach supplied by
GObject, this does not mean that the final application must be developed in C.
Care has been taken in order to have an easily bindingable project, so it can
be consumed from higher level languages.

This simple idea is shared throughout the whole GNOME ecosystem, that is
providing a common low-level base from where a set of bindings for higher level
languages (above all the garbage-collected ones) can be implemented, so the
end-user applications can be developed in any of the provided languages.

[adg-lua](https://github.com/ntd/adg-lua) is an example that shows how ADG can
be easily accessed from the Lua language.

## Using the library
![Sample lathe drawing for a diesel nozzle](img/nozzle.png)

Basically, an application based on ADG must fulfill the following tasks:

* define the model \
  instantiate and settle an AdgModel derived class, that is the virtual object
  representing the mechanical part or whatever you need to render;
* populate the canvas \
  stroke the model inside an AdgCanvas instance, completing the drawing with
  decoration entities (title block, quotes, labels, axis and whatever else
  needed);
* customize the rendering \
  by default the ADG library provides and uses some predefined style but you
  still have the opportunity to change the way the drawing will be rendered,
  such as changing line thickness, colors, fonts, spacing, quote style,
  hatching mode and so on;
* render to a cairo surface \
  once you have the canvas ready, just render it on a cairo surface: the ADG
  provides the AdgGtkArea facility for rendering on a GtkDrawingArea; checkout
  the list of cairo backends to know the availables options and how to use
  them.

### Define the model

The model is the abstract representation of the drawing subject (or part of
it). The most common one is probably the AdgPath class, a model built around
the cairo_path_t struct. A model can be rendered in the canvas more than once,
with different styles and matrices.

The units used in the model definition are not relevant, as they will became
signicative only while rendering it to the canvas (that is, when drawing a
model into a view). It is common practice to use obvious units: for instance,
in Italy you will use meters for plant projects and millimeters for mechanical
parts. When adding the model to the canvas, you should set a proper local
matrix to scale the drawing as needed and eventually get the proper ending
scale.

You can have as many models as you need, depending on the application
complexity. For instance, if the part you want to manage changes a lot only on
some specific detail, you can consider to move this everchanging portion on its
own model leaving the rest in another one, and join the models just before
rendering them to the canvas.

### Populate the canvas

With this operation the model is transposed to the view. Just instantiate an
AdgCanvas and add entities inside it in the same way you construct a user
interface in GTK+. Together with the model you will probably would like to add
other decoration entities such as title block, quotes, hatches and whatever
needed to get the final drawing.

Drawing by hand or with a CAD gives you full control: you must choose the best
position for every quotes avoiding overlapping by hand. An automatic drawing
system doesn't have the cognition of proper position and a collision detection
system is beyond the scope of this project.

The ADG way to solve this issue is by providing everything needed to escape
from (hopefully) any situation, allowing to customize almost everything. It is
up to the application to put the quotes in a better place or to choose a proper
scale.

### Global and local space

One key concept of this approach is the use of two different matrices: the
global matrix and the local matrix.

The global matrix is calculated by piling up (that is, multiplying) every
global map defined by an AdgEntity and its ancestors. How the local matrix is
calculated, instead, can be changed set by setting a specific property.

The big difference between these matrices is the global matrix is applied to
everything while the local matrix only to some parts, usually the ones
belonging in some way to a model. As a side note, the local matrix is always
applied (when used) before the global matrix.

![Different effects of a similar zoom factor in global and local space](img/local-global.png)

To grasp this concept, here it is a screenshot: applying a similar scale factor
using a global map or a local map brings two really different results.

As you can see, when zooming in local space only the model shape is scaled and
the start points of the dimensions follow this change (that is, they are scaled
too). Other stuff, such as line thicknesses, text and arrow sizes, the distance
from the extension lines to the shape and the spacing between the baselines,
kept the original scale.

When zooming in global space, instead, you get the traditional zoom: everything
is scaled.

By default global and local maps are initialized to the identity matrix, that
is a matrix that, when used in multiplication, doesn't change the source.

### Customize the rendering

The rendering customization is provided throught the interaction of the
following ADG components:

* `AdgStyle` and derived \
  In its basic form, the style is an GObject that implements the apply()
  method. This function should change the passed-in cairo context to fulfill a
  customization request.
* `AdgDress` \
  This is an abstraction layer to virtualize the styles. The entities will
  always refer to dresses instead of styles, allowing to do some quite advanced
  operation such as overriding a dress only in a specific branch of the entity
  hierarchy.
* `AdgEntity` \
  The entities are the natural consumers of styles. They provide APIs to
  resolve dresses to styles. Above all, adg_entity_set_style() provides a way
  to override the style of a dress in a specific entity.

#### Styles

The style is the brick over which all the customization is done. Being a huge
task that could grow beyond any guess, the ADG approach is to implement the
styles in an opened way, without knowing or guessing anything about them.

This means adding a new style is a matter of subclassing AdgStyle: the only
requirement is to implement the apply() virtual method. You could put all the
stuff you consider style stuff inside this new class: it is handled as an
opaque object by the ADG library itsself. A new style will be likely used by a
new entity, so you'd probably access the style instance only from the render()
method of this new entity.

#### Dresses

When an entity needs to access a style instance (usually inside its render()
method), the AdgDress value should be resolved to its AdgStyle equivalent. The
main getter function is adg_entity_style(), which executes the following
operations up to when a style is found:

* adg_entity_get_style(entity, dress);
* check if the style is defined directly by this entity type, that is if it was
  explicitely set with adg_entity_set_style();
* adg_entity_style(parent, dress);
* if the subject entity has a parent returns its style by recursively call
  adg_entity_style() on the parent entity;
* adg_dress_get_style(dress);
* return the default style for the given AdgDressvalue.

In the default implementation all the styles will be resolved by
adg_dress_get_style(), but this implementation gives a good level of freedom,
allowing the cascade overriding of a dress style with a single
adg_entity_set_style() call. When required, new AdgDress values can be easily
added with adg_dress_new(). Every dress always requires a default style, just
to be sure to resolve any request as stated above.

### Render to a cairo surface

To be useful, the canvas needs to be rendered somewhere. For convenience, the
ADG library provides AdgGtkArea and AdgGtkLayout widgets if the library has
been built with GTK+ support enabled. These are a GtkDrawingArea derived
widgets that can be embedded inside a GTK+ user interface. The former provides
a way to embed an AdgCanvas in a specific portion of the screen while the
latter adds scrollbars and zooming facilities.

In general you should use plain cairo to create the surface. The following
example shows a quite basic way to render a canvas to a pdf file:

```c
void
render_to_pdf(AdgCanvas *canvas)
{
    cairo_surface_t *surface;
    cairo_t *cr;

    surface = cairo_pdf_surface_create("test.pdf", 841, 595);
    cr = cairo_create(surface);
    cairo_surface_destroy(surface);

    adg_entity_render(ADG_ENTITY(canvas), cr);

    cairo_show_page(cr);
    cairo_destroy(cr);
}
```

You can check the `demo/adg-demo.c` program present in the ADG sources for a more
in-depth example.
