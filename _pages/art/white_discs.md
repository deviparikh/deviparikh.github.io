---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/white_discs.png
permalink: /white_discs
---

# White Discs

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.white_discs %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'white discs'></a>
  </div>
  {% endfor %}
</div>