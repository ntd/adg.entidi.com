---
title: 'Language bindings for ADG'
description: 'How to use the ADG canvas library from different programming languages'
---
Great care has been added in order to have a good bindingability: this project
has been based on GObject and GObject introspection especially for providing a
good base for language bindings.

## Lua bindings
![Sample drawing generated by Lua bindings](/img/adg-demo-lua.png)

Lua bindings are actively maintained by the ADG project and they are
effectively used to check the bindingability of the ADG and CPML APIs. They are
based on the LGI project and work out ot the box, that is if you install ADG
and LGI you automatically have Lua bindings availables.

adg-lua is not required for using ADG from Lua but it provides a set of test
programs, demos and snippets based on these bindings. You can download them
from the SourceForge release page of the ADG project.

LGI uses GObject introspection at runtime to access the underlying APIs, so the
provided bindings should always be in sync with the installed libraries. For
further technical details, you should consult the developer section.

## Python bindings

Python bindings should be available out of the box, provided you have PyGObject
properly installed. A pre-packaged version has been included in the All-In-One
package of the porting of PyGObject to win32 platforms (since version 3.10.2),
so now Windows seems to be a viable alternative for Python developers.