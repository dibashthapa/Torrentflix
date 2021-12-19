import cheerio from "cheerio";
import axios from "axios";
import Logger from "../core/Logger";
export const fetchPage = async (url) => {
    try {
        const response = await axios.get(url);
        const htmlResponse = response.data;
        return htmlResponse;
    }
    catch (err) {
        if (err instanceof Error) {
            Logger.error(err.message);
        }
        return null;
    }
};
export const scrape = (htmlResponse) => {
    try {
        const totalTags = [];
        if (!htmlResponse)
            return null;
        const $ = cheerio.load(htmlResponse);
        const magnetLink = $("ul.dropdown-menu")
            .find("li:nth-child(4) > a")
            .attr("href");
        const videoInfo = $("ul.list:nth-child(2)");
        const category = videoInfo.find("li:nth-child(1) span").text();
        const totalSize = videoInfo.find("li:nth-child(4) span").text();
        const tags = $("ul.category-name a").toArray();
        tags.forEach((tag) => {
            totalTags.push($(tag).text());
        });
        const thumbnail = $(".img-responsive.descrimg").attr("src");
        return { category, totalSize, magnetLink, tags: totalTags, thumbnail };
    }
    catch (err) {
        if (err instanceof Error) {
            Logger.error(err?.message);
        }
        return null;
    }
};
//# sourceMappingURL=1377x.js.map