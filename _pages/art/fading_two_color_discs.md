---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/fading_two_color_discs.png
permalink: /fading_two_color_discs
---

# Fading Two-color Discs

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.fading_two_color_discs %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'fading two-color discs'></a>
  </div>
  {% endfor %}
</div>