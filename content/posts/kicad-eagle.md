---
title: "Working for CERN (just a little)"
date: "2023-08-16"
summary: "That time I worked for CERN working on Kicad"
description: "I was fortunate enough to be selected for a work package updating the Eagle importer for KiCad to include schematic imports"
toc: true
readTime: true
autonumber: true
math: true
showTags: false
hideBackToTop: false
---

Kicad for many years had a Eagle PCB layout design importer but was missing the final piece of a schematic and project import. After submitting a few commmits that were accepted I was approached by the Kicad team to bid on the schematic importing work package. This was financed through support from CERN who contracted external developers to work on features, starting in 2014. I was lucky to be one of them in 2017. 

I had already been working on a [seperate tool](https://github.com/rustyoz/bxl) written in Go to convert the Ultra-librarian format (.bxl) to kicad symbols and footprints, so I was familiar with the Kicad data structures. Since Kicad already had an Eagle PCB importer, there was already the structure of a parser for Eagle data structures. 

So after a bit of back and forth over contracts, I got to work. The first commit is here [e92c8c1d6c3b2397ad9069b9316401ddbd58287a](https://github.com/KiCad/kicad-source-mirror/commit/e92c8c1d6c3b2397ad9069b9316401ddbd58287a).

The last commit I made is [89381e1103dbbdd00b784e60642deeea53af3539](https://github.com/KiCad/kicad-source-mirror/commit/89381e1103dbbdd00b784e60642deeea53af3539).

Testing of the feature was [announced in October 2017](https://www.kicad.org/blog/2017/10/Testing-Eagle-import-plugins/) and was released in version 5. 

Many updates have been made by other developers to the importer since but I am proud to know that I contributed to making Kicad one of the best EDA tools out there.

