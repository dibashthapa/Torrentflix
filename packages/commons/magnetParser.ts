const magnetLink =
  "magnet:?xt=urn:btih:DBB9E1D9BABCEEBB84D47E62CA5A667ED2F6B882&dn=Benedetta.2021.FRENCH.1080p.BluRay.x264.DDP5.1-NOGRP&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2770%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2760%2Fannounce&tr=udp%3A%2F%2Ftracker.thinelephant.org%3A12770%2Fannounce&tr=udp%3A%2F%2Ftracker.slowcheetah.org%3A14780%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce";

export class Magnet {
  public static validate(link: string) {
    if (!link.startsWith("magnet")) {
      throw new Error("Invalid magnet url");
    }
    return link;
  }

  public static parse(link: string) {
    try {
      const url = this.validate(link);
      const dn = url.slice(url.indexOf("dn=") + 3, url.indexOf("&tr"));
      return dn.split("+").join("-");
    } catch (err) {
      console.log(err);
    }
  }
}
