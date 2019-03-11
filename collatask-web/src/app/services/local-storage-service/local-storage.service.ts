import { Injectable } from "@angular/core";

const LOCAL_STORAGE_NAME: string = 'collatask-local-store';

export class StorageModel {
    constructor(id: string = '', data: string = '') {
        this.id = id;
        this.data = data;
    }
    public id: string = '';
    public data: string = '';
}

@Injectable()
export class LocalStorageService {
    constructor() {
        const _originalContent = localStorage.getItem(LOCAL_STORAGE_NAME);
        if (_originalContent === null || _originalContent === undefined)
            localStorage.setItem(LOCAL_STORAGE_NAME, '[]');
    }

    public save(model: StorageModel): void {
        const _originalContent = localStorage.getItem(LOCAL_STORAGE_NAME);
        var _storageItems: Array<StorageModel> = JSON.parse(
            _originalContent === null || _originalContent === 'undefined' ? '[]' : _originalContent
        );
        var _newList: Array<StorageModel> = [];
        for (var i = 0; i < _storageItems.length; i++) {
            if (_storageItems[i].id !== model.id)
                _newList.push(_storageItems[i]);
        }
        _newList.push(model);
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(_newList));
    }

    public get(id: string): StorageModel {
        const _originalContent = localStorage.getItem(LOCAL_STORAGE_NAME);
        if (_originalContent === null || _originalContent === undefined)
            return new StorageModel();
        else {
            var _storageItems: Array<StorageModel> = JSON.parse(_originalContent);
            var _model: StorageModel = new StorageModel();
            if (_storageItems.length !== 0) {
                for (var i = 0; i < _storageItems.length; i++) {
                    if (_storageItems[i].id === id)
                        _model = _storageItems[i];
                }
            }
            else {
                _model.id = '';
                _model.data = '';
            }
            return _model;
        }
    }

    public delete(id: string): void {
        const _originalContent = localStorage.getItem(LOCAL_STORAGE_NAME);
        var _storageItems: Array<StorageModel> = JSON.parse(
            _originalContent === null || _originalContent === 'undefined' ? '[]' : _originalContent
        );
        var _storageItems: Array<StorageModel> = JSON.parse(_originalContent);
        var _newList: Array<StorageModel> = [];
        for (var i = 0; i < _storageItems.length; i++) {
            if (_storageItems[i].id !== id)
                _newList.push(_storageItems[i]);
        }
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(_newList));
    }
}