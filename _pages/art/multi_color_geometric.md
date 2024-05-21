---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/multi_color_geometric.png
permalink: /multi_color_geometric
---

# Multi-color Geometric

<div class = 'art'>
  {% for person in site.data.art.multi_color_geometric %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'multi-color geometric'></a>
  </div>
  {% endfor %}
</div>