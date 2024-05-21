---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/borders_white_filled.png
permalink: /borders_white_filled
---

# White Filled Borders

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.borders_white_filled %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'white filled borders'></a>
  </div>
  {% endfor %}
</div>