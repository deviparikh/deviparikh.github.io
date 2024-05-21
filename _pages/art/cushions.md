---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/cushions.png
permalink: /cushions
---

# Cushions

<h2><a href='./create_your_own/tiles_cushions.html'>Create Your Own!</a></h2>

<div class = 'art'>
  {% for person in site.data.art.cushions %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'cushions'></a>
  </div>
  {% endfor %}
</div>