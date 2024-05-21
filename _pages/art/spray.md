---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/spray.png
permalink: /spray
---

# Spray

<div class = 'art'>
  {% for person in site.data.art.spray %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'spray'></a>
  </div>
  {% endfor %}
</div>