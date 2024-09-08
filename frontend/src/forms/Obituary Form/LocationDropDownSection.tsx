import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { City, State } from "country-state-city";
import React from "react";
import { cn } from "@/lib/utils";

import { useFormContext } from "react-hook-form";

const LocationDropDownSection = () => {
  const { control, setValue } = useFormContext();
  let stateData = State.getStatesOfCountry("US");
  let filteredStates = stateData.filter((state) => state.isoCode.length === 2);
  let cityData = null;
  let cityDataDied = null;
  const [openState, setOpenState] = React.useState(false);
  const [openStateDied, setOpenStateDied] = React.useState(false);
  const [openCity, setOpenCity] = React.useState(false);
  const [openCityDied, setOpenCityDied] = React.useState(false);
  const [stateBorn, setStateBorn] = React.useState<any | null>(null);
  const [stateDied, setStateDied] = React.useState<any | null>(null);
  const handleStateChange = (state: any) => {
    setStateBorn(state.isoCode);
    setValue("stateBorn", state.name);
    setOpenState(false);
    setValue("cityBorn", null);
  };

  const handleCityChange = (city: any) => {
    setValue("cityBorn", city.name);
    setValue("cityBornLongitude", city.longitude);
    setValue("cityBornLatitude", city.latitude);
    setOpenCity(false);
  };

  const handleStateDiedChange = (state: any) => {
    setStateDied(state.isoCode);
    setValue("stateDied", state.name);
    setOpenStateDied(false);
    setValue("cityDied", null);
  };
  const handleCityDiedChange = (city: any) => {
    setValue("cityDied", city.name);
    setValue("cityDiedLongitude", city.longitude);
    setValue("cityDiedLatitude", city.latitude);
    setOpenCityDied(false);
  };

  cityData = City.getCitiesOfState("US", stateBorn);
  cityDataDied = City.getCitiesOfState("US", stateDied);

  return (
    <div className="flex gap-6">
      <FormField
        control={control}
        name="stateBorn"
        render={({ field, fieldState }) => (
          <FormItem className="flex w-full flex-col flex-1">
            <FormLabel>State Born</FormLabel>
            <Popover open={openState} onOpenChange={setOpenState}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start",
                    fieldState.error && "border-red-500"
                  )}
                >
                  {field.value ? <>{field.value}</> : <>Select State Born</>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="bottom" align="center">
                <Command>
                  <CommandInput
                    placeholder="Search states"
                    autoComplete="new-password"
                  />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {filteredStates.map((state) => (
                        <CommandItem
                          key={state.name}
                          value={state.name}
                          onSelect={() => {
                            handleStateChange(state);
                          }}
                        >
                          {state.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="cityBorn"
        render={({ field, fieldState }) => (
          <FormItem className="flex w-full flex-col flex-1">
            <FormLabel>City Born</FormLabel>
            <Popover open={openCity} onOpenChange={setOpenCity}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start",
                    fieldState.error && "border-red-500"
                  )}
                >
                  {field.value ? <>{field.value}</> : <>Select City Born</>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="bottom" align="center">
                <Command>
                  <CommandInput
                    placeholder="Search cities"
                    autoComplete="new-password"
                  />
                  <CommandList>
                    <CommandEmpty>Select a state first</CommandEmpty>
                    <CommandGroup>
                      {cityData.map((city) => (
                        <CommandItem
                          key={city.name}
                          value={city.name}
                          onSelect={() => {
                            handleCityChange(city);
                          }}
                        >
                          {city.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="stateDied"
        render={({ field, fieldState }) => (
          <FormItem className="flex w-full flex-col flex-1">
            <FormLabel>State Died</FormLabel>
            <Popover open={openStateDied} onOpenChange={setOpenStateDied}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start",
                    fieldState.error && "border-red-500"
                  )}
                >
                  {field.value ? <>{field.value}</> : <>Select State Died</>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="bottom" align="center">
                <Command>
                  <CommandInput
                    placeholder="Search states"
                    autoComplete="new-password"
                  />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {filteredStates.map((state) => (
                        <CommandItem
                          key={state.name}
                          value={state.name}
                          onSelect={() => {
                            handleStateDiedChange(state);
                          }}
                        >
                          {state.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="cityDied"
        render={({ field, fieldState }) => (
          <FormItem className="flex w-full flex-col flex-1">
            <FormLabel>City Died</FormLabel>
            <Popover open={openCityDied} onOpenChange={setOpenCityDied}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start",
                    fieldState.error && "border-red-500"
                  )}
                >
                  {field.value ? <>{field.value}</> : <>Select City Died</>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="bottom" align="center">
                <Command>
                  <CommandInput
                    placeholder="Search cities"
                    autoComplete="new-password"
                  />
                  <CommandList>
                    <CommandEmpty>Select a death city</CommandEmpty>
                    <CommandGroup>
                      {cityDataDied.map((city) => (
                        <CommandItem
                          key={city.name}
                          value={city.name}
                          onSelect={() => {
                            handleCityDiedChange(city);
                          }}
                        >
                          {city.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </div>
  );
};

export default LocationDropDownSection;
