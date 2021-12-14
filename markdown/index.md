---
title: 'ADG cairo canvas'
description: 'What is the ADG cairo canvas, why it has been developed and how it should be used'
---
The ADG library (Automatic Drawing Generation) is a set of functions focused on
automating the drawing of mechanical parts.

When different parts share a similar shape, a custom application can be much
more effective than the traditional way of manually drawing every part with a
CAD. In many factories, typically where mass production is involved, this is
quite common. Valves, nozzles, elements, nuts, bolts, washers, needles and a
lot of other components fall into this category.

![Typical example: lathe drawing of an element piston](img/adg-sample-0.6.1.png)

You can get similar results by using a parametric CAD, but a custom application
provides the following benefits:

* **more extensible**\
  you are not tied to the user interface and you are not forced to interact
  with the user, so you can create headless services;
* **more customizable**\
  if you have to create an application from the ground up, so it can be
  whatever you want and using the technology stack you prefer;
* **not so bloated as a parametric CAD**\
  this honestly depends on what you have planned but, as a rule of thumb, an
  application based on the ADG doesn't need to be that complex;
* **can be easily connected to a database**\
  the model-view separation greatly improves the connectivity;
* **the drawings can be generated on the fly**\
  as already mentioned, the canvas does not enforce user interaction: this
  feature can be leveraged by a dynamic site or a web-based application, where
  the drawing can be generated on request.

Although the ADG project has been developed in C using an object-oriented
approach, the applications based on it are expected to be developed using
higher-level languages, especially garbage-collected ones. See the [language
bindings](/bindings) section for more details.

Its components (such as model handling, user interface support and drawing
customization) are fully decoupled, making possible for instance to build the
project on a headless server for web applications support. Check out the
[technical details](/technical) page for further information.

The project is cross-platform. It is known to build on various flavour of
GNU/Linux systems (ArchLinux, Slackware and Ubuntu), FreeBSD, OpenSolaris and
Windows XP (either by cross-compiling from GNU/Linux systems or by natively
building it on a MinGW environment).
