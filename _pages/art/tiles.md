---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/tiles.png
permalink: /tiles
---

# Tiles

<h2><a href='./create_your_own/tiles_cushions.html'>Create Your Own!</a></h2>

<div class = 'art'>
  {% for person in site.data.art.tiles %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'tiles'></a>
  </div>
  {% endfor %}
</div>