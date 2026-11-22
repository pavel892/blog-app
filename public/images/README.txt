Pixel Blog assets
=================

Each PNG is a cropped element from the generated pixel-art sprite sheet.
The original alpha channel is preserved; some crops may retain soft glow or
background pixels because the source artwork is a sprite sheet rather than
individually isolated vector assets.

Copy the PNG files into your Express project's:
  public/images/

Example in EJS:
  <img src="/images/controller.png" alt="Pixel art game controller">

Example in CSS:
  .site-header {
    background-image: url("/images/city-skyline.png");
    background-repeat: no-repeat;
    background-position: center bottom;
  }
