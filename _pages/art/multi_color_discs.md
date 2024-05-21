---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/multi_color_discs.png
permalink: /multi_color_discs
---

# Multi-color Discs

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.multi_color_discs %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'multi-color discs'></a>
  </div>
  {% endfor %}
</div>