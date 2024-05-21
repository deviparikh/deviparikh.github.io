---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/two_color_circles.png
permalink: /two_color_circles
---

# Two-color Circles

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.two_color_circles %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'two-color circles'></a>
  </div>
  {% endfor %}
</div>