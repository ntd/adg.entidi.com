---
title: 'Downloading the ADG'
description: 'Where you can download the official tarballs of the ADG project, where you can find the code repository and how to build it from sources'
---
Actually, the only supported way to get the ADG on your system is by building
it from the sources. Being the developers the target audience of this project,
this is not a big deal.

If you run into problems, there is no "blessed" way to get support: you can
either subscribe to the [mailing
list](https://sourceforge.net/projects/adg/lists/adg-devel) or submit an issue
to [Codeberg](https://codeberg.org/ntd/adg/issues),
[GitLab](https://gitlab.com/libadg/adg/-/issues) or
[GitHub](https://github.com/ntd/adg/issues). Please, ensure at least that you
have read and tried the following instructions before posting.

## License

The Automatic Drawing Generation library is released under the terms of the
[LGPL 2.1 license](https://opensource.org/licenses/LGPL-2.1) or later (at your
option). This choice was made to be compatible with the underlying libraries,
all of them availables under the LGPL.

## Backward compatibility

Application programming and binary interfaces (API and ABI) are monitored for
issues on every release. This service is kindly provided by [ABI
laboratory](https://abi-laboratory.pro/index.php?view=timeline&l=adg):
kudos to Andrey Ponomarenko for the help.

## Prerequisites/dependencies

The ADG library is based on the following software packages:

* **GLib** 2.38.0 or later `[required]` \
  GLib, together with the embedded GObject library, provides object oriented
  programming layer to plain C, binding facilities, commonly used data
  structures and much more.
* **cairo** 1.7.4 or later `[required]` \
  The core of the ADG project: a 2D rendering engine with multiple backends,
  such as x11, png, pdf, ps and svg.
* **pango** 1.10.0 or later `[optional]` \
  Pango, and more specifically pangocairo, is used for serious text rendering
  by the `AdgText` entity.
* **GTK** 3.0.0 or later (or 2.18.0 or later for GTK2 support)  `[optional]` \
  Used by the demo program to provide a showcase program.
* *gobject-introspection* 1.0.0 or later `[optional]` \
  For generating the metadata needed by the [language bindings](/bindings).
* **gtk-doc** 1.12.0 or later `[optional]` \
  For building the reference manual.
* **meson** 0.56.0 or later `[optional]` \
  The new build system is based on `meson`, so this will become a requirement
  as soon as the old autotools system is dropped.

The `[required]` dependencies are mandatory and should be installed before the
configuration phase. If you plan on developing with ADG, all these projects
should be installed along with their development version if your distribution
differentiates between runtime and development flavours.

## Building from the sources

When no binary packages are available or if you need to tweak some option or
simply want to play with the code, there is the (hopefully) ever working
approach of building the package by yourself. Being developers the target
audience of the ADG project, building from sources is the best supported way
in any case.

Issues and hints found on some platform are reported on the [Screenshot and
hints](/screenshots) page. The following sections should be considered more
like a set of suggestions than a list of instructions.

### Getting the sources

You can get the sources in two ways: by downloading a prepackaged source
tarball or by directly fetching the code from a git repository.

The source tarball is the simplest method because the tarball is packaged in a
(hopefully) buildable state and requires only the dependencies cited above. In
most cases, this is the way to go.

Fetching the sources from the repository is reserved for ADG developers or
advanced users. Sometimes it is also useful for getting a bleeding edge version
that provides a recently implemented feature not released yet. Building using
this approach requires `git` and `meson` (or the whole autotools infrastructure
in place though.

#### Using a source tarball

The ADG source tarballs can be downloaded directly from the [GitHub release
page](https://github.com/ntd/adg/releases). You just need to unpack the tarball
somewhere in your file system, e.g.:

```bash
wget https://github.com/ntd/adg/releases/download/0.9.3/adg-0.9.3.tar.bz2
tar xjvf adg-0.9.3.tar.bz2
cd adg-0.9.3
```

#### Fetching from a git repository

The ADG source code is managed by git, a distribuited version control system
with strong support for non-linear development. Actually, there are three
public repositories availables: [Codeberg](https://codeberg.org/ntd/adg),
[GitLab](https://gitlab.com/libadg/adg) and
[GitHub](https://github.com/ntd/adg). They are kept in sync with the official
repository, so you can freely clone your repository from anyone of them.

Once you have cloned the repository, and only if you are using the old
autotools based build system, you need to regenerate the autotools files. This
requires a whole bunch of dependencies to be installed, that is (at least)
**autoconf**, **automake**, **libtool** and **gtk-doc**.

```bash
# As an example, here I am cloning from codeberg
git clone https://codeberg.org/ntd/adg
cd adg
# The following step is not needed if building using meson
./autogen.sh
```

### Compilation

The new build system is based on `meson`, a saner and **much** quicker build
system than autotools. In the example below, we are using the `_build` folder
because the more common `build` (without underscore) is used by autotools.

```bash
meson _build
meson compile -C _build
meson test -C _build  # Not needed: run the test suite
_build/demo/adg-demo  # Not needed: launch the demo program
```

Check `meson_options.txt` to see the available options you can setup to
customize your building. As an example, the following command builds a headless
ADG (i.e. without GTK, typical when using it to build a web service) with
introspection support (so it can be used from Lua or Python):

```bash
meson _build-headless \
  -D pango=enabled \
  -D gtk=no \
  -D catalogdir=no \
  -D gtk-doc=disabled \
  -D introspection=enabled \
  -D tests=disabled
meson compile -C _build-headless
```

If you are still relying on the old autotools build system, just proceed in the
usual way:

```bash
./configure
make
make check     # Not needed: run the test suite
demo/adg-demo  # Not needed: launch the demo program
```

In this case too there are a lot of options you can pass to `./configure` for
customizing the build: check the output of `./configure --help` for hints.

### Installation

You need enough privileges to access the destination directory for writing.
By default the destination folder is set to `/usr/local` on most systems, so
you need to enable root privileges. If this is the case, use `su`, `sudo` or
something similar before proceeding or you will get a permission denied error.

On a meson based build, just run:

```bash
meson install -C _build
```

On an autotools based build, run this instead:

```bash
make install
```

At the end of this stage, at least two shared libraries (`libcpml-1.so` and
`libadg-1.so` or similar) together with their headers and pkg-config support
files should be copied into their destination folders.
