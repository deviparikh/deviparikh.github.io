---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/amt_art.png
permalink: /amt_art
---

# Crowdsourced Gallery

This is art created and described by 66 anonymous individuals on Amazon Mechanical Turk. They used their favorite "Create Your Own" <a href = "./art.html"> tool</a> to make these pieces.

<div class = 'art'>
  {% for person in site.data.art.amt_art %}
  <div class = 'artpiece_with_disc'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'AMT Art'></a>
    <br>{{person.title}}, November 2019
    <br>{{person.description}}
  </div>
  {% endfor %}
</div>
<br>