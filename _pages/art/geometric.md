---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/geometric.png
permalink: /geometric
---

# Geometric

<div class = 'art'>
  {% for person in site.data.art.geometric %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'geometric'></a>
  </div>
  {% endfor %}
</div>