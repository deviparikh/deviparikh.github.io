---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/suns.png
permalink: /suns
---

# Suns

<div class = 'art'>
  {% for person in site.data.art.suns %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'suns'></a>
  </div>
  {% endfor %}
</div>