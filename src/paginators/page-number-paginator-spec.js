import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import BasePaginator from 'src/paginators/base-paginator';
import Paginator from 'src/paginators/page-number-paginator';
import QueryHandler from 'src/query-handlers/page-number-query-handler';
import * as request from 'src/helpers/request-spy';


const {expect} = chai;

chai.use(chaiAsPromised);

describe('drf-paginator', function() {
  describe('paginators', function() {
    describe('PageNumberPaginator', function() {
      it('extends the base paginator', function() {
        const paginator = new Paginator(request.spy);

        expect(paginator)
          .to.be.an.instanceOf(BasePaginator);
      });

      describe('constructor', function() {
        it('sets the query handler to a page-number',
          function() {
            const paginator = new Paginator(request.spy);

            expect(paginator.queryHandler)
              .to.be.an.instanceOf(QueryHandler);
          });

        it('sets the given query parameters', function() {
          const queryParams = { page: 42 };
          const paginator = new Paginator(request.spy, null, queryParams);

          expect(paginator.page).to.equal(42);
        });
      });
    });
  });
});
