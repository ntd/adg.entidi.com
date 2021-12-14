---
title: 'Implementation strategies'
description: 'How different applications can been implemented from the same codebase using alternative strategies'
---
One of the main selling point of the ADG canvas is its extensibility. In this
page are shown three different ways of implement the same application with
different strategy. Any approach has different advantages and disadvantages...
there is no universal approach so every application stack shown below does not
try to fit everywhere.

## Plain C application

The official ADG tarball provides an adg-demo program that shows some of the
features of the canvas without the need of installing additional stuff. It is
also possible to run it without installing ADG itself.

Once the project is built (and before installing anything) the demo program can
be started from builddir (that is the directory where you called make) by using
the demo/adg-demo-uninstalled command in the terminal. After being installed,
the program is renamed to adg-demo, so if you want to call it after having
installed ADG, just write adg-demo. This also avoids any clash between
installed and uninstalled version, so you can run an uninstalled version of
adg-demo with an old library yet installed in your system and be sure the
proper files are used.

An example of work-flow on a typical GNU/Linux system could be similar to the
following:

```bash
wget http://sourceforge.net/projects/adg/files/adg/0.7.3/adg-0.7.3.tar.bz2
tar xf adg-0.7.3.tar.bz2
cd adg-0.7.3
./configure
make -j7
demo/adg-demo-uninstalled
sudo make install
```

Although the ADG is not expected to be used from C, the adg-demo program shows
it is possible. This can be sometime useful, such as on a constrained
environment or where performances are an issue. Anyway this approach is
generally discoraged: C is a great language but its bright side is not exactly
maintainability and dynamicity. Having to deal with drawing generation, where
things change quickly and rapid prototyping is a strong requirement, means you
need a dynamic programming language that let your application evolve together
with the final drawing. This also explains why a lot of effort has been put
together to have language bindings availables and supported as first class
citizien.

![Data map of the adg-demo C application](img/adg-c.png)

The data map shows how actors interact together in adg-demo to provide the
final result. The communication between the user interface elements (handled by
GTK) and the drawing logic (based on the ADG library) happens throught
Signals, so alghouth the source is a single file, the user interface code and
the drawing code are effectively decoupled. This is a fundamental point: libadg
does not depend on GTK, so the ADG canvas can be effectively built on headless
server by using the `--without-gtk` option.

## Lua application
![Data map of the adg-demo.lua application](img/adg-lua.png)

`adg-demo.lua` provides an example that shows how ADG can be easily accessed
from the Lua language. Basically, it is a rewrite from scratch of the C demo
application previously described.

A typical system for generating technical drawings can be divided in two parts:

1. collecting data, and this includes user interaction, database connection or
   any interface to external data sources;
2. elaborating data. that is generating the needed drawings from the available
   data.

The ADG project does not make any assumption for (1), leaving any door opened.
Data can be collected via HTTP protocol in a web application, with GTK on a
graphical desktop or throught arguments on command-line scripts that do not
require user interaction.

For (2) instead, any kind of tool that can be remotely useful to simplify the
generation of the drawing is provided, relying on cairo for abstracting the
output formats.

The data map on the right shows the interactions between the elements of the
adg-demo.lua application. While ADG canvas and Cairo library elements are
fixed, the other actors can be easily interchanged to provide another kind of
implementation that fulfills the same task. Turning back to the stock C demo,
thethe only actor that changes is the Lua node substituted by a C application.

## Web application

As stated by the feature list, the ADG canvas can be easily used in web-based
applications. The demo described here is available online and it will be kept
up to date, so it can be used to test the status of the latest release too.

First of all a couple of clarifications.

* This is a demo program! An ADG based application is capable of generating any
  kind of drawing expressable by the availables entities. A piston has been
  used because it was a real case study.
* The application is not locked to the web technology here described. PHP and
  SilverStripe have been choosed simply because they were yet availables out of
  the box on this web server.

### System overview
![Overall design of the web demo online on adg.entidi.com](img/adg-web.png)

Web applications usually involve putting together a lot of different
technologies. The server expected by the adg-web demo must be equipped with the
following programs:

* PHP and Nginx for basic HTML handling;
* the dedicated silverstripe-adg module to integrate the adg-web.lua results
  into the already existing SilverStripe site;
* Lua and adg-web.lua with piston.lua (part of the adg-lua project) for
  handling the generation of the drawing;
* LGI bindings, to provide automatic bindings between Lua and ADG + Cairo at
  run-time;
* ADG and cairo, for physically generating the technical drawing.

This requires manual intervention to set up the server, because a typical web
server will hardly met all the above requirements.

### Deployment example

The following instructions have been used on an old CentOS 5 web-server that
does not exist anymore, so they are severely outdated. They are kept online
though because they can still be relevant in some case, for instance to give an
idea on how the deployment should be addressed.

The online demo has been deployed on a CentOS 5 web-server, so PHP and Apache
were already availables as part of the LAMP stack. The platform is fairly old
(CentOS 5 has been released on april 2007) so it has been also used for testing
the "adaptability" of the project on outdated systems. Without bindings the
process would have been easy: only cairo (and consequently pixman) should have
been updated (ADG requires at least cairo 1.7.4, released on August 2008). The
bindings instead requires GObject introspection, a project quite picky on its
dependencies.

First of all the environment has been updated to meet the basic requirements:

```bash
sudo yum install gcc flex bison intltool python25-devel libpng-devel freetype-devel fontconfig-devel lua-devel
export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig
export LD_LIBRARY_PATH=/usr/local/lib64:/usr/local/lib
```

After that, everything else has been built:

```bash
curl -O ftp://sourceware.org/pub/libffi/libffi-3.0.13.tar.gz
tar xf libffi-3.0.13.tar.gz
cd libffi-3.0.13
./configure --disable-static
make
sudo make install
cd ..

curl -O http://ftp.gnome.org/pub/GNOME/sources/glib/2.34/glib-2.34.3.tar.xz
xz -d glib-2.34.3.tar.xz
tar xf glib-2.34.3.tar
cd glib-2.34.3
./configure --disable-modular-tests
make
sudo make install
cd ..

curl -O http://www.cairographics.org/releases/pixman-0.28.2.tar.gz
tar xf pixman-0.28.2.tar.gz
cd pixman-0.28.2
./configure --disable-static
make
sudo make install
cd ..

curl -O http://cairographics.org/releases/cairo-1.12.14.tar.xz
xz -d cairo-1.12.14.tar.xz
tar xf cairo-1.12.14.tar
cd cairo-1.12.14
./configure --disable-static
make
sudo make install
cd ..

curl -O http://ftp.gnome.org/pub/GNOME/sources/gobject-introspection/1.34/gobject-introspection-1.34.2.tar.xz
xz -d gobject-introspection-1.34.2.tar.xz
tar xf gobject-introspection-1.34.2.tar
gobject-introspection-1.34.2
./configure --disable-static --disable-tests
make
sudo -E make install
cd ..

curl -Lo adg-0.7.3.tar.bz2 http://sourceforge.net/projects/adg/files/adg/0.7.3/adg-0.7.3.tar.bz2/download
tar xf adg-0.7.3.tar.bz2
cd adg-0.7.3
./configure
make
sudo make install
cd ..

git clone -b master git://github.com/ntd/lgi.git
cd lgi
make
sudo make PREFIX=/usr LUA_LIBDIR=/usr/lib64/lua/5.1 install

curl -Lo adg-lua-0.1.2.tar.bz2 http://sourceforge.net/projects/adg/files/adg-lua/0.1.2/adg-lua-0.1.2.tar.bz2/download
tar xf adg-lua-0.1.2.tar.bz2
cd adg-lua-0.1.2
./configure
make
sudo make install
cd ..
```

### Performances consideration

The drawings are generated by calling the adg-web.lua script with a passthru()
call. Although not a great choice on the performance side, this greatly reduces
the maintaining burden on our side: adg-web.lua shares a lot of code with
adg-demo.lua inside the piston.lua file. If ADG bindings are availables from
PHP, nothing prevents you from generating the drawing directly from the PHP
side, hence getting better performances. It is also possible to develop a CGI
filter in C, if response time is a real critical factor.
