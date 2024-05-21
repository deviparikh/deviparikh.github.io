---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/columns.png
permalink: /columns
---

# Columns

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.columns %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'columns'></a>
  </div>
  {% endfor %}
</div>