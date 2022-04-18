import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import { opportunityProvidersSlice } from "../app/modules/CompanyProfile/_redux/providers/providersSlice";
import { opportunityProviderSectorsSlice } from "../app/modules/CompanyProfile/_redux/providerSectors/providerSectorsSlice";
import { opportunitiesSlice } from "../app/modules/Opportunities/_redux/opportunities/opportunitiesSlice";
import { opportunityTypesSlice } from "../app/modules/Opportunities/_redux/opportunityTypes/opportunityTypesSlice";
import { opportunityAttendeesSlice } from "../app/modules/Opportunities/_redux/opportunityAttendees/opportunityAttendeesSlice";
import { providerUsersSlice } from "../app/modules/Auth/_redux/providerUsers/userSlice";
import { OtherProvidersSlice } from "../app/modules/OtherProviders/_redux/otherProviders/otherProvidersSlice";
import { contentsSlice } from "../app/modules/Contents/_redux/contentsSlice";
import { seekersSlice } from "../app/modules/Seekers/_redux/seekers/seekersSlice";
import { specialProjectSlice } from "../app/modules/SpecialProjects/_redux/specialProjectSlice";
import { usersSlice } from "../app/modules/Users/_redux/usersSlice";
import { dashboardSlice } from "../app/modules/Dashboard/_redux/dashboardSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  providers: opportunityProvidersSlice.reducer,
  providerSectors: opportunityProviderSectorsSlice.reducer,
  opportunities: opportunitiesSlice.reducer,
  opportunityTypes: opportunityTypesSlice.reducer,
  opportunityAttendees: opportunityAttendeesSlice.reducer,
  providerUsers: providerUsersSlice.reducer,
  opportunityProviders: OtherProvidersSlice.reducer,
  contents: contentsSlice.reducer,
  followers: seekersSlice.reducer,
  specialProjects: specialProjectSlice.reducer,
  users: usersSlice.reducer,
  dashboard: dashboardSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
