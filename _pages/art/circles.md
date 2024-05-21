---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/circles.png
permalink: /circles
---

# Circles

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.circles %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'circles'></a>
  </div>
  {% endfor %}
</div>