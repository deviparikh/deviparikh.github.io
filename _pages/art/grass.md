---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/grass.png
permalink: /grass
---

# Grass

<div class = 'art'>
  {% for person in site.data.art.grass %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'grass'></a>
  </div>
  {% endfor %}
</div>