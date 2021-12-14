---
title: 'Screenshots and hints'
description: 'Hints and suggestions on how the ADG cairo canvas can be deployed on different operating systems'
---
Here are referenced a sample set of operating systems where the ADG project has
been successfully built. Currently the project is switching to the meson build
system, so the shell snippets could not be up to date.

On each section, a short summary of the issues met on that specific platform is
shown. The eventual commands displayed should be taken with a grain of salt:
they can (and likely will) fail.

## GNU/Linux
![adg-demo 0.6.0 running on Arch linux 64](img/adg-demo-0.9.3-ArchLinux.png)

Actually the ADG is developed on this platform, so there should be no problems
in building either from a tarball or from a fresh git checkout. GObject
introspection and gtk-doc documentation are included in the tarball, so there
is no need to rebuild them.

The screenshot is taken from `adg-demo` version 0.9.3 running on an ArchLinux
distribution with the pho-earth-by-night GTK theme and xfwm window manager.

## FreeBSD
![adg-demo 0.6.0 running on FreeBSD 8](img/adg-demo-0.6.0-FreeBSD8.png)

Some build component, specifically the i18n part and the shave tool, requires
GNU make so `gmake` must be used instead of make. This means the only major
difference from a GNU/Linux system is the use of a csh based shell instead of
GNU bash.

Keeping the build compatible with FreeBSD is a matter of not relying on
bashism. This gives the advantage that the ADG could be easily included as-is
in the FreeBSD port system.

As from version 0.6.3, there are no known issues on FreeBSD: both the tarball
and the git checkout build fine and all the tests pass successfully, making
this a good platform for ADG development.

For convenience here are the commands used to build the ADG on FreeBSD:

```bash
su -
pkg_add -r gnome2-lite gtk-doc autotools
exit
git clone https://github.com/ntd/adg.git
cd adg
./autogen.sh
gmake
demo/adg-demo
```

FreeBSD does not come with a set of packages preselected: it is a minimal
distribution with tons of customization variants. The above commands work for a
FreeBSD 8.2 installed with the Development category preselected.

## Open solaris and openindiana
![adg-demo 0.6.0 running on OpenSolaris 2009.6](img/adg-demo-0.6.0-OpenSolaris2009.png)

ADG builds just fine from a tarball and from a git checkout.

In the following, the commands used on a bare OpenSolaris 2009.6 installation
to build and run adg-demo from a fresh git checkout. OpenSolaris does not
provide a standard automake and aclocal binary, so they must be explicitely set
using the proper environment variable at configure time:

```bash
pfexec pkg install SUNWgit SUNWgcc \
    SUNWlibtool SUNWaconf SUNWgnu-automake-110 \
    SUNWgnome-common-devel SUNWxorg-headers
git clone https://github.com/ntd/adg.git
cd adg
AUTOMAKE=automake-1.10 ACLOCAL=aclocal-1.10 ./autogen.sh
make
demo/adg-demo
```

![adg-demo 0.9.3 on OpenIndiana Hipster 2021.10](img/adg-demo-0.9.3-OpenIndiana2021.png)

OpenIndiana seems to be the sane continuation of the now dead OpenSolaris
project. After the required build dependencies have been installed, the ADG
project basically works out of the box here, making OpenIndiana another viable
option for ADG development purposes.

For reference, the following commands have been used to compile a fresh git
checkout:

```bash
sudo pkg install gnu-m4 autoconf automake libtool gtk-doc
git clone https://github.com/ntd/adg.git
cd adg
./autogen.sh
gmake
demo/adg-demo
```

## Windows
![adg-demo 0.6.0 running on Windows XP](img/adg-demo-0.6.0-MingW.jpeg)

The current build system is able to cross-compile the project from a properly
configured GNU/Linux system and build an installer using the NSis tool. A
couple of wrappers under the build directory are provided for building win32
and/or win64 binaries. Binaries got by cross-compilation can either be tested
on GNU/Linux by using wine or natively on Windows.

Native builds on Windows are (at least theoretically) possible by leveraging
the [MSYS2](https://www.msys2.org) project, but it is not supported by the ADG
project itself.
