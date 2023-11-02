import * as changeCase from "change-case";

export function getCubitStateTemplate(
  cubitName: string,
  useEquatable: boolean
): string {
  return useEquatable
    ? getEquatableCubitStateTemplate(cubitName)
    : getDefaultCubitStateTemplate(cubitName);
}

function getEquatableCubitStateTemplate(cubitName: string): string {
  const pascalCaseCubitName = changeCase.pascalCase(cubitName.toLowerCase());
  const snakeCaseCubitName = changeCase.snakeCase(cubitName.toLowerCase());
  return `part of '${ snakeCaseCubitName }_cubit.dart';

abstract class ${ pascalCaseCubitName }State extends Equatable {
  const ${ pascalCaseCubitName }State();

  @override
  List<Object> get props => [];
}

class ${ pascalCaseCubitName }Initial extends ${ pascalCaseCubitName }State {}
`;
}

function getDefaultCubitStateTemplate(cubitName: string): string {
  const pascalCaseCubitName = changeCase.pascalCase(cubitName.toLowerCase());
  const snakeCaseCubitName = changeCase.snakeCase(cubitName.toLowerCase());
  return `part of '${ snakeCaseCubitName }_cubit.dart';

@immutable
abstract class ${ pascalCaseCubitName }State {}

class ${ pascalCaseCubitName }LodingState extends ${ pascalCaseCubitName }State {
  @override
  List<Object> get props => [];
}

class ${ pascalCaseCubitName }LoadedState extends ${ pascalCaseCubitName }State {
  @override
  List<Object> get props => [];
}

class ${ pascalCaseCubitName }ErrorState extends ${ pascalCaseCubitName }State {
  final String errorMessage;
  final AppErrorType appErrorType;

  const ${ pascalCaseCubitName }ErrorState({required this.errorMessage, required this.appErrorType});

  @override
  List<Object> get props => [errorMessage, appErrorType];
}
`;
}