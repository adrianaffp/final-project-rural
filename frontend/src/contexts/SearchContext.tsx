import React, { useContext, useState } from 'react';

type SearchContext = {
	propertyId: string;
	destination: string;
	checkIn: Date;
	checkOut: Date;
	adultCount: number;
	childCount: number;
	saveSearchValues: (destination: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
	children: React.ReactNode;
};

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
	const [destination, setDestination] = useState<string>(() => sessionStorage.getItem('destination') || '');
	const [checkIn, setCheckIn] = useState<Date>(() => new Date(sessionStorage.getItem('checkIn') || new Date().toISOString()));
	const [checkOut, setCheckOut] = useState<Date>(() => new Date(sessionStorage.getItem('checkOut') || new Date().toISOString()));
	const [adultCount, setAdultCount] = useState<number>(() => parseInt(sessionStorage.getItem('adultCount') || '1'));
	const [childCount, setChildCount] = useState<number>(() => parseInt(sessionStorage.getItem('childCount') || '0'));
	const [propertyId, setPropertyId] = useState<string>(() => sessionStorage.getItem('propertyId') || '');

	const saveSearchValues = (destination: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number, propertyId?: string) => {
		setDestination(destination);
		setCheckIn(checkIn);
		setCheckOut(checkOut);
		setAdultCount(adultCount);
		setChildCount(childCount);
		if (propertyId) {
			setPropertyId(propertyId);
		}

		// save to session storage
		sessionStorage.setItem('destination', destination);
		sessionStorage.setItem('checkIn', checkIn.toISOString());
		sessionStorage.setItem('checkOut', checkOut.toISOString());
		sessionStorage.setItem('adultCount', adultCount.toString());
		sessionStorage.setItem('childCount', childCount.toString());
		if (propertyId) {
			sessionStorage.setItem('propertyId', propertyId);
		}
	};

	return <SearchContext.Provider value={{ destination, checkIn, checkOut, adultCount, childCount, propertyId, saveSearchValues }}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => {
	const context = useContext(SearchContext);
	return context as SearchContext;
};
