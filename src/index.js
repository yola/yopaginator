import LimitOffsetPaginator from './paginators/limit-offset-paginator';
import LimitOffsetHandler from './query-handlers/limit-offset-query-handler';
import PageMerger from './page-merger';
import PageNumberPaginator from './paginators/page-number-paginator';
import PageNumberHandler from './query-handlers/page-number-query-handler';
import PaginatorError from './paginator-error';

const paginate = function(request, reqOpts, queryParams) {
  return new PageNumberPaginator(request, reqOpts, queryParams);
};

const all = function(request, reqOpts, queryParams) {
  let paginator;

  if (typeof request === 'function') {
    paginator = paginate(request, reqOpts, queryParams);
  } else {
    paginator = request;
  }

  const pageMerger = new PageMerger(paginator);
  const mergeAllPages = function(pageCount) {
    return pageMerger.merge(1, pageCount);
  };

  return paginator.fetchPageCount()
    .then(mergeAllPages);
};

const drfPaginator = {
  all,
  LimitOffsetPaginator,
  LimitOffsetQueryHandler: LimitOffsetHandler,
  PageMerger,
  PageNumberPaginator,
  PageNumberQueryHandler: PageNumberHandler,
  paginate,
  PaginatorError
};

export default drfPaginator;
