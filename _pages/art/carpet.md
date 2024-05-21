---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/carpet.png
permalink: /carpet
---

# Carpet

<h2><a href='./create_your_own/carpet.html'>Create Your Own!</a></h2>

<div class = 'art'>
  {% for person in site.data.art.carpet %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'carpet'></a>
  </div>
  {% endfor %}
</div>