import { useEffect } from "react";

import { Paper, InputBase, InputAdornment, Alert } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import debounce from "lodash/debounce";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  query: yup.string().min(3).required(),
});

export type FormValues = yup.InferType<typeof schema>;

interface SearchFormProps {
  initialValue: string;
  onSubmit: (values: FormValues) => void;
}

export default function SearchForm({
  initialValue,
  onSubmit,
}: SearchFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      query: initialValue,
    },
  });

  useEffect(() => {
    const debouncedSubmit = debounce(() => handleSubmit(onSubmit)(), 2000);
    const subscription = watch(debouncedSubmit);

    return () => subscription.unsubscribe();
  }, [handleSubmit, onSubmit, watch]);

  return (
    <>
      <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 1 }}>
        <Controller
          name="query"
          control={control}
          render={({ field }) => (
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Github user"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              {...field}
            />
          )}
        />
      </Paper>
      {errors.query && (
        <Alert sx={{ mt: 2 }} severity="warning">
          {errors.query.message}
        </Alert>
      )}
    </>
  );
}
