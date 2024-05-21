---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/passing_by.gif
permalink: /passing_by
---

# Passing By

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.passing_by %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'passing by'></a>
  </div>
  {% endfor %}
</div>