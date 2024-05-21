---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/borders.png
permalink: /borders
---

# Borders

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.borders %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'borders'></a>
  </div>
  {% endfor %}
</div>