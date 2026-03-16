import { service } from "@/utils/request";

// 获取文章列表的函数
interface homePage {
  getHottest: number;
  count: number;
}

interface homePageResponse {
  base: {
    code: string;
    msg: string | null;
  },
  data: {
    items: [
      article_id: number,
      user_id: number,
      username: string,
      title: string,
      content: string,
      cover_url: string,
      visit_count: number,
      like_count: number,
      comment_count: number,
      created_at: string
    ];
    total: number;
    task: null;
  } | null
}

export const getArticles = (params: homePage): Promise<homePageResponse> => {
  return service.request({
    method: "get",
    url: `/juejin/homepage`,
    params
  });
};


// 获取详细文章信息的函数
interface  Articles {
  article_id: string;
  Authorization: string;
}

interface  ArticlesResponse {
  base: {
    code: string,
    msg: string,
  }
  data: {
    task: {
      article_id: number,
      user_id: number,
      username: string,
      title: string,
      content: string,
      cover_url: string,
      visit_count: number,
      like_count: number,
      comment_count: number,
      created_at: string,
    },
    items: [
      {
        comment_id: number,
        user_id: number,
        username: string,
        avatar_url: string,
        article_id: number,
        parent_id: number,
        like_count: number,
        child_count: number,
        content: string,
        created_at: string,
      }
    ],
    total: number
  } | null
}

export const Articles = (data: Articles): Promise<ArticlesResponse> => {
  return service.request({
      method: "get",
      url: `/juejin/article`,
      data
  });
};


// 获取我写的文章，赞过的文章的函数
interface myHomePage {
  getWrittenArticle: number;
  Authorization: string;
}

interface myHomePageResponse {
  base: {
    code: string;
    msg: string;
  },
  data: {
    items: [
      article_id: number,
      user_id: number,
      username: string,
      title: string,
      content: string,
      cover_url: string,
      visit_count: number,
      like_count: number,
      comment_count: number,
      created_at: string
    ];
    total: number;
    task: null;
  }
}

export const getMyArticles = (data: myHomePage): Promise<myHomePageResponse> => {
  return service.request({
      method: "get",
      url: `/juejin/myhomepage`,
      data
  });
};


// 修改用户名的函数
interface changeUsername {
  username: string;
  Authorization: string;
}

interface changeUsernameResponse {
  base: {
    code: string,
    msg: string,
  }
  data: null;
}

export const changeUsername = (data: changeUsername): Promise<changeUsernameResponse> => {
  return service.request({
      method: "put",
      url: `/juejin/user/setup/username`,
      data
  });
};

// 修改头像的函数
interface changeAvatar {
  avatar_url: string;
  Authorization: string;
}

interface changeAvatarResponse {
  base: {
    code: string,
    msg: string,
  }
  data: null;
}

export const changeAvatar = (data: changeAvatar): Promise<changeAvatarResponse> => {
  return service.request({
      method: "put",
      url: `/juejin/user/setup/avatar_url`,
      data
  });
};

// 修改密码的函数
interface changePassword {
  password: string;
  Authorization: string;
}

interface changePasswordResponse {
  base: {
    code: string,
    msg: string,
  }
  data: null;
}

export const changePassword = (data: changePassword): Promise<changePasswordResponse> => {
  return service.request({
      method: "put",
      url: `/juejin/user/setup/password`,
      data
  });
};

// 写文章的函数
interface writeArticles {
  Authorization: string;
  title: string;
  content: string;
  cover_url: string;
}

interface writeArticlesResponse  {
  base: {
    code: string,
    msg: string,
  };
  data: null;
}

export const writeArticles = (data: writeArticles): Promise<writeArticlesResponse> => {
  return service.request({
      method: "post",
      url: `/juejin/write`,
      data
  });
};