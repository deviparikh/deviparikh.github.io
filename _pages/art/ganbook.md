---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/GANbook.png
permalink: /ganbook
---

# GANbook

Processed generations from a GAN trained on my sketchbook. The sketchbook has sketches, doodles, paper cutting, mandalas, zentangles -- often with a brief hand-written description.

These pieces are the result of human-AI collaboration. My physical sketchbook, a neural generative model (AI), and a procedural generative approach have come together. It is unclear where the influence of each starts and the other ends.

<div class = 'art'>
  {% for person in site.data.art.ganbook %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'GANbook'></a>
  </div>
  {% endfor %}
</div>