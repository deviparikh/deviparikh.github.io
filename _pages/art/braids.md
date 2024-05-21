---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/braids.png
permalink: /braids
---

# Braids

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.braids %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'braids'></a>
  </div>
  {% endfor %}
</div>