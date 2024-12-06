import moment from "moment";

export const formatDate = (date: string | number | Date, format: string): string => {
  return moment(date).utc().format(format);
};

export const truncate = (str: string, len: number): string => {
  if (str.length > len && str.length > 0) {
    let new_str = str + " ";
    new_str = str.slice(0, len); // substr 대신 slice 사용
    new_str = new_str.slice(0, new_str.lastIndexOf(" "));
    new_str = new_str.length > 0 ? new_str : str.slice(0, len);
    return new_str + "...";
  }
  return str;
};

export const stripTags = (input: string): string => {
  return input.replace(/<(?:.|\n)*?>/gm, "");
};

export const editIcon = (
  storyUser: { _id: string },
  loggedUser: { _id: string },
  storyId: string,
  floating: boolean = true
): string => {
  // console.log({ floating });
  // storyUser: 게시글 작성자
  // loggedUser: 로그인 사용자
  if (storyUser._id.toString() == loggedUser._id.toString()) {
    if (floating) {
      return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
    } else {
      return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
    }
  } else {
    return "";
  }
};

export const select = (selected: string, options: { fn: (context: any) => string }): string => {
  return options
    .fn(this)
    .replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"')
    .replace(new RegExp(">" + selected + "</option>"), ' selected="selected"$&');
};
