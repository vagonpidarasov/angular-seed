import {Action} from 'src/modules/redux';
import {ImageLink} from '../image-link.type';
import {
    RESOLVE_IMAGE_LINKS,
    RESOLVE_IMAGE_LINKS_SUCCESS,
    RESOLVE_IMAGE_LINKS_FAIL,
    SET_FOOTER_LINKS,
    SET_HEADER_LINKS,
} from './action-types';

export class ResolveLinks implements Action {
    static type = RESOLVE_IMAGE_LINKS;
    readonly type = RESOLVE_IMAGE_LINKS;
}

export class ResolveLinksSuccess implements Action {
    static type = RESOLVE_IMAGE_LINKS_SUCCESS;
    readonly type = RESOLVE_IMAGE_LINKS_SUCCESS;
    constructor(public payload:ImageLink[]) {}
}

export class ResolveLinksFail implements Action {
    static type = RESOLVE_IMAGE_LINKS_FAIL;
    readonly type = RESOLVE_IMAGE_LINKS_FAIL;
    constructor(public payload:any) {}
}

export class SetFooterLinks implements Action {
    static type = SET_FOOTER_LINKS;
    readonly type = SET_FOOTER_LINKS;
    constructor(public payload:ImageLink[]) {}
}

export class SetHeaderLinks implements Action {
    static type = SET_HEADER_LINKS;
    readonly type = SET_HEADER_LINKS;
    constructor(public payload:ImageLink[]) {}
}