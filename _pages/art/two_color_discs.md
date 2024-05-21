---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/two_color_discs.png
permalink: /two_color_discs
---

# Two-color Discs

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.two_color_discs %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'two-color discs'></a>
  </div>
  {% endfor %}
</div>