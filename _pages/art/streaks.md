---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/streaks.png
permalink: /streaks
---

# Streaks

<h2><a href='./create_your_own/streaks.html'>Create Your Own!</a></h2>

<div class = 'art'>
  {% for person in site.data.art.streaks %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'streaks'></a>
  </div>
  {% endfor %}
</div>
