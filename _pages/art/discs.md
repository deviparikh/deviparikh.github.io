---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/discs.png
permalink: /discs
---

# Discs

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.discs %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'discs'></a>
  </div>
  {% endfor %}
</div>