// You should import "entityjs"
import {
    CloudStoreEntity,
    ValueProperty,
    ReferenceProperty,
    PrimaryKeyProperty,
    IDataContext } from "entityjs";

/*
 * This sample provides a simple demonstration of using the StorageEntities in entityjs.
 */

export class EmployeeEntity extends CloudStoreEntity {

    public static KIND = "employee";

    /**
     * This means the property is a primary key.
     * Every CloudStoreEntity should have one and only primary key.
     */
    @PrimaryKeyProperty()
    public id: string;

    /**
     * This means the property is a value property.
     */
    @ValueProperty()
    public name: string;

    /**
     * Represents reference property.
     * Reference properties are not loaded by default. You need to load explicity using
     * .load() on them.
     */
    @ReferenceProperty(EmployeeEntity)
    public manager: EmployeeEntity;

    public constructor() {
        super(EmployeeEntity.KIND);
    }
}
