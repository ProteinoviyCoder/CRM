import { useDispatch, useSelector } from "react-redux";
import { ApiDispatch, RootState } from "@/shared/store/store";

export const useAppDispatch = useDispatch.withTypes<ApiDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
