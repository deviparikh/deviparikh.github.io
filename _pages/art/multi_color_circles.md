---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/multi_color_circles.png
permalink: /multi_color_circles
---

# Multi-color Circles

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.multi_color_circles %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'multi-color circles'></a>
  </div>
  {% endfor %}
</div>