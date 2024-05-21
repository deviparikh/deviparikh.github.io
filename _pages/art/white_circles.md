---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/white_circles.png
permalink: /white_circles
---

# White Circles

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.white_circles %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'white circles'></a>
  </div>
  {% endfor %}
</div>