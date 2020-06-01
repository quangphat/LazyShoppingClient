const isNullOrWhiteSpace = (str: string): boolean => {
    if (str == null || str === '' || str == undefined || str.trim() == '')
        return true
    return false;
}
export const Path = {
    test: '/test',

    //article
    article: '/article',
    article_edit: (id?: string): string => {
        if (isNullOrWhiteSpace(id))
            return '/article/edit/:id'
        return `/article/edit/${id}`
    },
    article_create: '/article/create',
    article_draft: (id?: string): string => {
        if (isNullOrWhiteSpace(id))
            return '/article/draft/:id'
        return `/article/draft/${id}`
    },
    article_detail: (id?: string): string => {
        if (isNullOrWhiteSpace(id))
            return '/article/:id'
        return `/article/${id}`
    },
    register: '/register',
    legal_term: '/legal/terms',
    recommend_tags: '/recommend_tags',
    article_by_tags: '/tags',
    search_global: '/search',
    profile: (profileName?: string): string => {
        if (isNullOrWhiteSpace(profileName))
            return '/profile/:profileName'
        return `/profile/${profileName}`
    },
}