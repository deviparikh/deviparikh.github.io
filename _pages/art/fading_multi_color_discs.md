---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/fading_multi_color_discs.png
permalink: /fading_multi_color_discs
---

# Fading Multi-color Discs

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.fading_multi_color_discs %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'fading multi-color discs'></a>
  </div>
  {% endfor %}
</div>