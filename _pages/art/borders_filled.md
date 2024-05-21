---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/borders_filled.png
permalink: /borders_filled
---

# Filled Borders

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.borders_filled %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'borders filled'></a>
  </div>
  {% endfor %}
</div>